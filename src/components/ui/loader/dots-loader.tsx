type Props = {
  title?: string
}

export function DotsLoader({ title }: Props) {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-primary rounded-full animate-bounce"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: "1s",
              }}
            />
          ))}
        </div>
        <p className="text-sm text-muted-foreground">{title || 'Cargando...'}</p>
      </div>
    </div>
  )
}
