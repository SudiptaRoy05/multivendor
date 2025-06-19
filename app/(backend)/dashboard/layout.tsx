import getUser from "@/app/action/auth/getUser";
import DashboardAside from "@/components/DashboardAside";
import DashboardNav from "@/components/DashboardNav";


const Layout = async ({ children }: { children: React.ReactNode }) => {

  const userData = await getUser();
  const user = {
    name: userData?.name,
    email: userData?.email,
    role: userData?.role

  }
  console.log("layout", user)

  return (
    <div className="h-screen flex flex-col">
      <nav className="h-30 border-b shadow-sm">
        <DashboardNav user={user} />
      </nav>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 h-full border-r shadow-sm">
          <DashboardAside user={user} />
        </aside>

        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
