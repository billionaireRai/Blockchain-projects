import UnAuthorize from "@/components/UnAuthorizeWrapper";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {

  return ( 
    <>
      <UnAuthorize>{children}</UnAuthorize>
    </>
    );
}