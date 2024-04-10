import CustomAppBar from "./customAppBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <CustomAppBar />
      {children}
    </div>
  );
}
