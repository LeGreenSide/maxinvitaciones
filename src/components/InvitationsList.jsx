import invitations from '../data/invitations.json';
import InvitationSection from './InvitationSection.jsx';

const InvitationsList = () => {
  return (
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 max-w-7xl mx-auto px-4">
      {invitations.map((inv) => (
        <InvitationSection key={inv.id} data={inv} />
      ))}
    </div>
  );
};

export default InvitationsList;