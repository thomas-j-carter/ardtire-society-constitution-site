'use client'

import { useEffect, useMemo, useState } from 'react'
import { supabaseBrowser } from '@/lib/supabase/client'

type DocVisibility = 'public'|'members'|'admins'
type DocumentRow = { id: string; title: string; description: string | null; visibility: DocVisibility }
type DocumentVersionRow = { id: string; version: number; storage_bucket: string; storage_path: string; file_name: string }

async function sha256Hex(buf: ArrayBuffer) {
  const hash = await crypto.subtle.digest('SHA-256', buf)
  return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, '0')).join('')
}

export function DocumentsManager() {
  const supabase = useMemo(() => supabaseBrowser(), [])
  const [docs, setDocs] = useState<DocumentRow[]>([])
  const [selected, setSelected] = useState<DocumentRow | null>(null)
  const [versions, setVersions] = useState<DocumentVersionRow[]>([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [visibility, setVisibility] = useState<DocVisibility>('members')
  const [status, setStatus] = useState<string>('')

  async function refresh() {
    const { data } = await supabase.from('documents').select('id,title,description,visibility').order('created_at', { ascending: false })
    setDocs((data as any) ?? [])
  }

  async function loadVersions(docId: string) {
    const { data } = await supabase.from('document_versions').select('id,version,storage_bucket,storage_path,file_name').eq('document_id', docId).order('version', { ascending: false })
    setVersions((data as any) ?? [])
  }

  useEffect(() => { refresh() }, [])

  async function createDoc() {
    setStatus('Saving…')
    const { data, error } = await supabase.rpc('create_document', { title_text: title, description_text: description || null, visibility_value: visibility })
    if (error) { setStatus('Error'); return }
    setTitle('')
    setDescription('')
    setStatus('Saved')
    await refresh()
    setTimeout(() => setStatus(''), 1200)
  }

  async function uploadNewVersion(file: File) {
    if (!selected) return
    setStatus('Uploading…')
    const bucket = 'documents'
    const arrayBuf = await file.arrayBuffer()
    const sha = await sha256Hex(arrayBuf)
    const path = `${selected.id}/${Date.now()}-${file.name}`

    const { error: upErr } = await supabase.storage.from(bucket).upload(path, file, { upsert: false })
    if (upErr) { setStatus('Upload failed'); return }

    const { error: verErr } = await supabase.rpc('add_document_version', {
      document_id_value: selected.id,
      file_name_value: file.name,
      mime_type_value: file.type || null,
      size_bytes_value: file.size,
      sha256_value: sha,
      storage_bucket_value: bucket,
      storage_path_value: path,
    })
    if (verErr) { setStatus('Version save failed'); return }

    setStatus('Uploaded')
    await loadVersions(selected.id)
    setTimeout(() => setStatus(''), 1200)
  }

  async function download(v: DocumentVersionRow) {
    const { data, error } = await supabase.storage.from(v.storage_bucket).download(v.storage_path)
    if (error || !data) { setStatus('Download failed'); return }
    const url = URL.createObjectURL(data)
    const a = document.createElement('a')
    a.href = url
    a.download = v.file_name
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="card p-4">
        <div className="text-sm font-semibold text-slate-900">Documents</div>
        <div className="mt-3 grid gap-2">
          {docs.map((d) => (
            <button key={d.id} className="rounded-2xl border border-slate-200 px-3 py-2 text-left hover:bg-slate-50" onClick={() => { setSelected(d); loadVersions(d.id) }}>
              <div className="font-semibold text-slate-900">{d.title}</div>
              <div className="text-xs text-slate-600">{d.visibility}</div>
            </button>
          ))}
          {docs.length === 0 ? <div className="text-sm text-slate-700">No entries published.</div> : null}
        </div>
      </div>

      <div className="grid gap-6">
        <div className="card p-4">
          <div className="text-sm font-semibold text-slate-900">Create</div>
          <div className="mt-3 grid gap-2">
            <label className="text-sm font-semibold">Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="rounded-2xl border border-slate-200 px-3 py-2 text-sm" />
            <label className="text-sm font-semibold">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="rounded-2xl border border-slate-200 px-3 py-2 text-sm" rows={3} />
            <label className="text-sm font-semibold">Visibility</label>
            <select value={visibility} onChange={(e) => setVisibility(e.target.value as any)} className="rounded-2xl border border-slate-200 px-3 py-2 text-sm">
              <option value="members">Members</option>
              <option value="admins">Admins</option>
              <option value="public">Public</option>
            </select>
            <button className="btn btn-primary mt-2" onClick={createDoc} disabled={!title}>Create document</button>
            {status ? <div className="text-xs text-slate-600">{status}</div> : null}
          </div>
        </div>

        <div className="card p-4">
          <div className="text-sm font-semibold text-slate-900">Versions</div>
          {selected ? (
            <div className="mt-3">
              <div className="text-sm font-semibold text-slate-900">{selected.title}</div>
              <div className="mt-3">
                <input type="file" onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadNewVersion(f) }} />
              </div>
              <div className="mt-4 grid gap-2">
                {versions.map((v) => (
                  <div key={v.id} className="rounded-2xl border border-slate-200 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-sm font-semibold text-slate-900">v{v.version}</div>
                      <button className="btn btn-primary text-sm" onClick={() => download(v)}>Download</button>
                    </div>
                    <div className="mt-1 text-xs text-slate-600">{v.file_name}</div>
                  </div>
                ))}
                {versions.length === 0 ? <div className="text-sm text-slate-700">No entries published.</div> : null}
              </div>
            </div>
          ) : (
            <div className="mt-3 text-sm text-slate-700">Select a document.</div>
          )}
        </div>
      </div>
    </div>
  )
}
