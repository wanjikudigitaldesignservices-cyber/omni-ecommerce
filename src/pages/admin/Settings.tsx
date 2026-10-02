import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function Settings() {
  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="staff">Staff & Security</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="logs">Audit Logs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
              <CardDescription>Manage your store details, currency, and tax rates.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label>Store Name</Label>
                <Input defaultValue="Nexus Commerce" />
              </div>
              <div className="space-y-1">
                <Label>Currency</Label>
                <Input defaultValue="USD" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Payment Configuration</CardTitle>
              <CardDescription>IntaSend API keys and Webhook secrets. Kept strictly server-side.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label>IntaSend Publishable Key</Label>
                <Input type="password" defaultValue="pk_test_12345" />
              </div>
              <div className="space-y-1">
                <Label>IntaSend Secret Key</Label>
                <Input type="password" defaultValue="sk_test_12345" />
              </div>
              <Button>Update Keys</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staff">
          <Card>
            <CardHeader>
              <CardTitle>Staff Management</CardTitle>
              <CardDescription>Invite staff and manage roles.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline">Invite Staff Member</Button>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center p-2 border rounded">
                  <span>admin@example.com</span>
                  <span className="text-sm text-gray-500">Super Admin</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Storefront Content</CardTitle>
              <CardDescription>Manage banners, pages, and blog posts.</CardDescription>
            </CardHeader>
            <CardContent className="space-x-2">
              <Button variant="outline">Manage Banners</Button>
              <Button variant="outline">Static Pages</Button>
              <Button variant="outline">Blog Editor</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle>Audit Logs</CardTitle>
              <CardDescription>Track all write actions performed by staff.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-gray-50 border rounded text-sm text-gray-600 font-mono space-y-2">
                <div>[2026-10-02 12:00:00] Super Admin updated Product 'Sony WH-1000XM5' (ID: p0...1)</div>
                <div>[2026-10-02 11:45:00] Inventory Manager adjusted stock for 'v0...2' (+5)</div>
                <div>[2026-10-02 09:30:00] Admin exported Orders CSV</div>
              </div>
              <Button variant="outline" className="mt-4">Export Full Log (CSV)</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
