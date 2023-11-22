import { HomeIcon, PieChart, SquareStack } from 'lucide-react';
import { MenuItem } from '../types/IMenu';

export const URLS = {
  HOME: '/',
  ADVANCED_USER: '/advance-user',
  REPORTS_DASHBOARD: {
    _: '/reports-dashboard',
    MANUAL_TRANSACTION_REPORT: '/reports-dashboard/manual-transaction-report',
    AGENCY_CONTROL_REPORT: '/reports-dashboard/agency-control-report',
    ACCOUNT_RECEIVABLE_REPORT: '/reports-dashboard/account-receivable-report',
  },
 
};

/* use path for define key of menuItem */
export const menuListMock: MenuItem[] = [
  {
    code: '',
    label: 'home',
    Icon: <HomeIcon size={18} />,
    path: URLS.HOME,
  },
 
  {
    code: 'advanced-user',
    label: 'advanceUser',
    Icon: <SquareStack size={18} />,
    path: URLS.ADVANCED_USER,
  },
  {
    code: 'reports-dashboard',
    label: 'reportsDashboard',
    Icon: <PieChart size={18} />,
    path: URLS.REPORTS_DASHBOARD._,
    children: [
      {
        code: 'manual-transaction-report',
        label: 'manualTransactionReport',
        path: URLS.REPORTS_DASHBOARD.MANUAL_TRANSACTION_REPORT,
        // permission: [PERMISSION_CODES.R_AGENT_USER + '.' + PERMISSION_ACTIONS.READ],
      },
      {
        code: 'agency-control-report',
        label: 'agencyControlReport',
        path: URLS.REPORTS_DASHBOARD.AGENCY_CONTROL_REPORT,
        // permission: [PERMISSION_CODES.R_AGENT_USER + '.' + PERMISSION_ACTIONS.READ],
      },
      {
        code: 'account-receivable-report',
        label: 'accountReceivableReport',
        path: URLS.REPORTS_DASHBOARD.ACCOUNT_RECEIVABLE_REPORT,
        // permission: [PERMISSION_CODES.R_AGENT_USER + '.' + PERMISSION_ACTIONS.READ],
      },
    ],
  },
 
];

export function flatMenu() {
  let result: MenuItem[] | [] = [];
  menuListMock.forEach(menu => {
    const { children, ...rest } = menu;
    result = [...result, rest];
    if (children) {
      children.forEach((child:any) => {
        result = [...result, child];
      });
    }
  });
  return result;
}
