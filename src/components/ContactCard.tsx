import { Contact } from '../types';

interface ContactCardProps {
  contact: Contact;
}

const getAvatarColor = (name: string): string => {
  const colors = [
    'bg-pink-100 text-pink-800',
    'bg-blue-100 text-blue-800',
    'bg-purple-100 text-purple-800',
    'bg-green-100 text-green-800',
    'bg-orange-100 text-orange-800'
  ];
  
  const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  return colors[index];
};

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const ContactCard = ({ contact }: ContactCardProps) => {
  const avatarColor = getAvatarColor(contact.name);
  const initials = getInitials(contact.name);

  return (
    <div className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-lg ${avatarColor} flex items-center justify-center font-semibold`}>
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold truncate">{contact.name}</h3>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground truncate">{contact.email}</p>
            <p className="text-sm text-muted-foreground">{contact.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;