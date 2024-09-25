import AdminHeader from '../Components/AdminHeader/AdminHeader';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <>
      <AdminHeader>{children}</AdminHeader>
    </>
  );
}
