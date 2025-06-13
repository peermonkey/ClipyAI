import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../services/auth/auth-config';
import OnboardingWizard from '../../../components/OnboardingWizard';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    // server component redirect
    return redirect('/login');
  }

  // TODO: check onboarding
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Welcome, {session.user?.email}</p>
      {/* Onboarding wizard could appear conditionally */}
      <OnboardingWizard open={false} onComplete={() => {}} />
    </main>
  );
} 