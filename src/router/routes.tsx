import Home from '@mui/icons-material/Home';
import FactoryIcon from '@mui/icons-material/Factory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { OrderManagement } from '../pages/Plants&Assemblies/orderManagement';
import { HomePage } from '../pages/home';
import { OrderDetails } from '../pages/QualityManagement/OrderDetails';
import { SCREEN_TITLES } from '../constants/sampleEula';
import { CheckList } from '../pages/QualityManagement/CheckListView';
import { ManageQualityOdersList } from '../pages/QualityManagement/manageQualityOrdersList';
import { ExportTableFormat } from '../pages/GeneratePdf/testpdfGenerator';

export const PAGES = [
    {
        title: 'Breaker Quality Dashboard',
        route: '',
        component: HomePage,
        icon: Home,
    },
    {
        title: 'Order Management',
        route: 'order-management',
        component: OrderManagement,
        icon: FactoryIcon,
    },
    {
        title: 'Quality Management',
        route: 'quality-management-orders-list',
        component: ManageQualityOdersList,
        icon: ShoppingCartIcon,
    },
];

export const AppNavigator = [
    {
        title: SCREEN_TITLES.orderDetails,
        route: 'order-details',
        component: OrderDetails,
        //icon: Service,
    },
    {
        title: SCREEN_TITLES.viewCheckList,
        route: 'checkList',
        component: CheckList,
    },
    { title: 'testPdf', route: 'testpdf', component: ExportTableFormat },
];
