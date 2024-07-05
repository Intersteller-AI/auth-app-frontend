import PageIllustration from '../../components/page-illustration'

export default function AuthLayout({
  children,
}) {
  return (
    <main className="grow">

      <PageIllustration />

      {children}

    </main>
  )
}
