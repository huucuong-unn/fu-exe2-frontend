import LayoutWithFooter from '~/components/Layouts/LayoutWithFooter';
import Mentors from '~/components/Mentors';
import Checkout from '~/pages/Checkout';
import Companies from '~/pages/Companies';
import CompaniesCampaignDetail from '~/pages/CompaniesCampaignDetails';
import CompaniesCampaignHistory from '~/pages/CompaniesCampaignHistory';
import CompanyDetails from '~/pages/CompanyDetails';
import Following from '~/pages/Following';
import ForgotPassword from '~/pages/new/ForgotPassword';
import LandingPage from '~/pages/LandingPage';
import { MentorProfile } from '~/pages/MentorProfile';
import SignInSide from '~/pages/SignInSide';
import SignUp from '~/pages/SignUp';
import UserProfilesTest from '~/pages/SignUp/testUploadImage';
import { Application } from '~/pages/Application';
import CreateMentorProfile from '~/pages/CreateMentorProfile';
import MentorHistoryForCompany from '~/pages/MentorHistoryForCompany';
import MentorLandingPage from '~/pages/MentorLandingPage';
import CampaignDetail from '~/pages/MentorCampainDetailPage';
import AdminLayout from '~/components/Layouts/AdminLayout';
import AdCampaign from '~/pages/AdCampaign';
import AdMentee from '~/pages/AdMentee';
import AdMentor from '~/pages/AdMentor';
import AdAccount from '~/pages/AdAccount';
import Payment from '~/pages/Payment/index';
import StudentHistory from '~/pages/StudentHistory';
import AdOrder from '~/pages/AdOrders';
import AdDashboard from '~/pages/AdDashboard';
import SignUpForCompany from '~/pages/SignUpForCompany';
import NotAuthorized from '~/pages/NotAuthorized';
import MentorManageProfile from '~/pages/MentorManageProfile';
import AdminSignIn from '~/pages/AdminSignIn';

//new
import LoginUser from '~/pages/new/LoginUser';
import LoginAdmin from '~/pages/new/LoginAdmin';
import LoginBusiness from '~/pages/new/LoginBusiness';
import Test from '~/pages/Test';
import FooterHome from '~/parts/FooterHome';
import RegisterUser from '~/pages/new/RegisterUser';
import ResetPassword from '~/pages/new/ResetPassword';
import Header from '~/parts/Header';
import FindYourPlan from '~/pages/new/FindYourPlan';
import FullLayout from '~/components/Layouts/FullLayout';
import Homepage from '~/pages/new/Homepage';
import AboutUs from '~/pages/new/AboutUs';
import AIResumeChecker from '~/pages/new/AIResumeChecker';
import Blog from '~/pages/new/Blog';
import InternshipProgram from '~/pages/new/InternshipProgram';
import InternshipProgramDetail from '~/pages/new/BlogDetail';
import PaymentSuccess from '~/pages/new/PaymentSuccess';
import PaymentFailed from '~/pages/new/PaymentFailed';
import AICoverLetter from '~/pages/new/AICoverLetter';
import BlogDetail from '~/pages/new/BlogDetail';
import UserProfile from '~/pages/new/UserProfile';
import BlogsManagement from '~/pages/new/BlogsManagement';
import AccountsManagement from '~/pages/new/AccountsManagement';
import PaymentsManagement from '~/pages/new/PaymentsManagement';
// import DefaultLayout from '~/components/Layouts/DefaultLayout';

const publicRoutes = [
    { path: '/following', component: Following },
    { path: '/mentors', component: Mentors },
    { path: '/mentor/:mentorId', component: MentorProfile },
    { path: '/user/profile', component: UserProfile },
    { path: '/user/history', component: StudentHistory },

    //Company
    { path: '/company', component: Companies },

    { path: '/company/:companyId', component: CompanyDetails },
    { path: '/company/sign-up', component: SignUpForCompany, layout: null },

    //Auth
    { path: '/sign-in', component: SignInSide, layout: null },
    { path: '/admin/sign-in', component: AdminSignIn, layout: null },
    { path: '/sign-up', component: SignUp, layout: null },
    // { path: '/forgot-password', component: ForgotPassword, layout: null },

    { path: '/checkout', component: Checkout, layout: null },

    //Mentor
    { path: '/campaigns', component: MentorLandingPage, layout: LayoutWithFooter },

    // Campaign detail route
    { path: '/campaigns/:campaignId', component: CampaignDetail, layout: LayoutWithFooter },
    //Mentor
    { path: '/mentor-manage-profile', component: MentorManageProfile, layout: LayoutWithFooter },

    //Payment
    { path: '/payment', component: Payment },
    { path: '/admin/account', component: AdAccount, layout: AdminLayout },

    { path: '/NotAuthoried', component: NotAuthorized, layout: null },
    { path: '/test', component: UserProfilesTest, layout: null },

    //new
    { path: '/login', component: LoginUser, layout: null },
    { path: '/admin/login', component: LoginAdmin, layout: null },
    { path: '/business/login', component: LoginBusiness, layout: null },
    { path: '/register', component: RegisterUser, layout: null },
    { path: '/forgot-password', component: ForgotPassword, layout: null },
    { path: '/reset-password', component: ResetPassword, layout: null },
    { path: '/home', component: Homepage, layout: FullLayout },
    { path: '/', component: Homepage, layout: FullLayout },
    { path: '/offer', component: FindYourPlan, layout: FullLayout },
    { path: '/about-us', component: AboutUs, layout: FullLayout },
    { path: '/ai-resume', component: AIResumeChecker, layout: FullLayout },
    { path: '/ai-coverletter', component: AICoverLetter, layout: FullLayout },
    { path: '/blog', component: Blog, layout: FullLayout },
    { path: '/internship-program', component: InternshipProgram, layout: FullLayout },
    { path: '/blog/:blogId', component: BlogDetail, layout: FullLayout },
    { path: '/payment/success', component: PaymentSuccess, layout: null },
    { path: '/payment/failed', component: PaymentFailed, layout: null },
    { path: '/profile/:userId', component: UserProfile, layout: FullLayout },
    { path: '/admin/blog-management', component: BlogsManagement, layout: AdminLayout },
    { path: '/admin/account-management', component: AccountsManagement, layout: AdminLayout },
    { path: '/admin/payment-management', component: PaymentsManagement, layout: AdminLayout },

    { path: '/test/footer', component: FooterHome, layout: null },
    { path: '/test/header', component: Header, layout: null },
];

const adminRoutes = [
    //admin
    { path: '/admin/mentee', component: AdMentee, layout: AdminLayout },
    { path: '/admin/mentor', component: AdMentor, layout: AdminLayout },
    { path: '/admin/campaign', component: AdCampaign, layout: AdminLayout },
    { path: '/admin/orders', component: AdOrder, layout: AdminLayout },
    { path: '/admin/dashboard', component: AdDashboard, layout: AdminLayout },
];

const companyRoutes = [
    //company
    { path: '/company/campaign-history', component: CompaniesCampaignHistory },
    { path: '/company/campaign-details/:campaignId', component: CompaniesCampaignDetail },
    { path: '/company/create-mentor-profile', component: CreateMentorProfile },
    { path: '/company/create-mentor-History', component: MentorHistoryForCompany },
];

const studentRoutes = [{ path: '/user/apply', component: Application }];

const mentorRoutes = [{ path: '/campaigns', component: MentorLandingPage, layout: LayoutWithFooter }];

const privateRoutes = [];

export { privateRoutes, publicRoutes, adminRoutes, companyRoutes, studentRoutes, mentorRoutes };
