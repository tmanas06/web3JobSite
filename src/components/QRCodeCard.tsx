import { useEffect, useRef } from 'react'
import QRCode from 'qrcode'

export function QRCodeCard({ text }: { text: string }) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null)
	useEffect(() => {
		if (!canvasRef.current) return
		QRCode.toCanvas(canvasRef.current, text, { width: 200, margin: 1, color: { light: '#ffffff', dark: '#000000' } })
	}, [text])
	return (
		<div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-lg">
			<div className="flex flex-col items-center gap-3">
				<div className="p-2 bg-white rounded-lg shadow-sm">
					<canvas ref={canvasRef} className="rounded-md" />
				</div>
				<div className="text-xs text-gray-600 dark:text-gray-300 break-all max-w-[200px] text-center font-mono">
					{text}
				</div>
				<button 
					onClick={() => navigator.clipboard.writeText(text)}
					className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-xs font-medium transition-colors duration-200"
				>
					Copy Link
				</button>
			</div>
		</div>
	)
}
