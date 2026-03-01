'use client'

type SignActionButtonProps = {
  actionId: string
}

export function SignActionButton({ actionId }: SignActionButtonProps) {
  async function handleClick() {
    console.log('Sign action:', actionId)
    // TODO: wire this to your signing endpoint / RPC
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="rounded-md bg-indigo-700 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-800"
    >
      Sign
    </button>
  )
}