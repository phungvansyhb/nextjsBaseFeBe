import DashBoardLayout from '@/shared/components/common/admin/DashboardLayout'
const AdminDashboard = () => {
    return (
        <div>AdminDashboard</div>
    )
}
AdminDashboard.getLayout = (children: React.ReactNode) => <DashBoardLayout>{children}</DashBoardLayout>
export default AdminDashboard