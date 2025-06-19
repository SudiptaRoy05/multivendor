import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function ProfilePage() {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <p className="text-gray-500 mb-4">Manage your account settings and preferences.</p>

      {/* Tabs Navigation */}
      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList>
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="address">Address</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>

        {/* Personal Tab Content */}
        <TabsContent value="personal">
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <p className="text-gray-500 mb-4">Update your personal details</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">First name</label>
                <input
                  type="text"
                  defaultValue="Alex"
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last name</label>
                <input
                  type="text"
                  defaultValue="Johnson"
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  defaultValue="olex.johnson@email.com"
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  defaultValue="+1 (556) 123-4567"
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Bio</label>
              <textarea
                defaultValue="Tell us about yourself!"
                className="mt-1 p-2 w-full border rounded"
                rows="3"
              />
            </div>
            <div className="flex justify-between">
              <button className="text-gray-500 hover:text-gray-700">Cancel</button>
              <Button className="bg-red-500 text-white">Save Changes</Button>
            </div>
          </div>
        </TabsContent>

        {/* Address Tab Content */}
        <TabsContent value="address">
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h3 className="text-lg font-semibold mb-4">Address Information</h3>
            <p className="text-gray-500 mb-4">Update your address details</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Street</label>
                <input
                  type="text"
                  defaultValue="123 Main St"
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  defaultValue="New York"
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">State</label>
                <input
                  type="text"
                  defaultValue="NY"
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Zip Code</label>
                <input
                  type="text"
                  defaultValue="10001"
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
            </div>
            <div className="flex justify-between">
              <button className="text-gray-500 hover:text-gray-700">Cancel</button>
              <Button className="bg-red-500 text-white">Save Changes</Button>
            </div>
          </div>
        </TabsContent>

        {/* Transactions Tab Content */}
        <TabsContent value="transactions">
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h3 className="text-lg font-semibold mb-4">Transaction History</h3>
            <p className="text-gray-500 mb-4">View your transaction details</p>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Order #1234</span>
                <span>$200.00</span>
              </div>
              <div className="flex justify-between">
                <span>Order #1235</span>
                <span>$150.00</span>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Notification Preferences */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
        <p className="text-gray-500 mb-4">Manage how you receive notifications</p>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Order Updates</label>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Promotions and deals</label>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Newsletter</label>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Wishlist updates</label>
            <Switch />
          </div>
        </div>
        <div className="mt-6">
          <Button className="bg-red-500 text-white">Save Preferences</Button>
        </div>
      </div>
    </div>
  );
}