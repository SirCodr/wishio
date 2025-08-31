export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 py-12 lg:px-8">
      {children}
    </section>
  )
}