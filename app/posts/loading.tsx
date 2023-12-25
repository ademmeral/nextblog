import XRSpinner from "@/XReact/components/XRSpinner/XRSpinner"

function LoadingPage() {
  return (
    <div className="loadingPage flex-[70%]">
      <XRSpinner
        thickness={5}
        size={90}
        color="var(--textClr)"
      />
    </div>
  )
}

export default LoadingPage