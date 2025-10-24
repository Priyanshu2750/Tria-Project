import { useState, useEffect, useMemo } from 'react';
import { Contact } from './types';
import ContactCard from './components/ContactCard';
import AddContactDialog from './components/AddContactDialog';
import EmptyState from './components/EmptyState';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { ScrollArea } from './components/ui/scroll-area';
import ThemeToggle from './components/ThemeToggle';

const initialContacts: Contact[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+91 98765 43210'
  },
  {
    id: '2',
    name: 'Arjun Patel',
    email: 'arjun.p@example.com',
    phone: '+91 87654 32109'
  },
  {
    id: '3',
    name: 'Neha Gupta',
    email: 'neha.gupta@example.com',
    phone: '+91 76543 21098'
  },
  {
    id: '4',
    name: 'Raj Malhotra',
    email: 'raj.m@example.com',
    phone: '+91 65432 10987'
  },
  {
    id: '5',
    name: 'Ananya Singh',
    email: 'ananya.s@example.com',
    phone: '+91 54321 09876'
  }
];

const STORAGE_KEY = 'tria_contacts_v1';

type SortOption = 'name-asc' | 'name-desc' | 'recent-desc' | 'recent-asc';

function App() {
  const [contacts, setContacts] = useState<Contact[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Contact[];
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      // ignore parse errors and fall back to initial
    }
    return initialContacts;
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>('name-asc');

  // persist contacts to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
    } catch (e) {
      // ignore storage errors (e.g., quota)
    }
  }, [contacts]);

  // sorted contacts memo
  const sortedContacts = useMemo(() => {
    const copy = [...contacts];
    switch (sortOption) {
      case 'name-asc':
        return copy.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return copy.sort((a, b) => b.name.localeCompare(a.name));
      case 'recent-desc':
        return copy.sort((a, b) => Number(b.id) - Number(a.id));
      case 'recent-asc':
        return copy.sort((a, b) => Number(a.id) - Number(b.id));
      default:
        return copy;
    }
  }, [contacts, sortOption]);

  const filteredContacts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return sortedContacts;
    return sortedContacts.filter(contact => {
      return (
        contact.name.toLowerCase().includes(q) ||
        contact.email.toLowerCase().includes(q) ||
        contact.phone.toLowerCase().includes(q)
      );
    });
  }, [sortedContacts, searchQuery]);

  const handleAddContact = (newContact: Omit<Contact, 'id'>) => {
    const contact: Contact = {
      ...newContact,
      id: Date.now().toString(),
    };
    setContacts(prev => [...prev, contact]);
    setIsAddDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-6xl px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-[280px,1fr] gap-6">
          {/* Sidebar */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-semibold">T</span>
              </div>
              <h1 className="text-xl font-semibold">Tria Contacts</h1>
            </div>
            <div className="py-2">
              <p className="text-sm text-muted-foreground">
                All Contacts
                <span className="ml-2 text-xs bg-muted px-2 py-1 rounded-md">
                  {contacts.length} contacts
                </span>
              </p>
            </div>
          </div>

          {/* Main Content */}
          <main className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search contacts by name, email or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex items-center gap-2">
                <select
                  aria-label="Sort contacts"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as SortOption)}
                  className="rounded-md border px-2 py-1 text-sm"
                >
                  <option value="name-asc">Name A → Z</option>
                  <option value="name-desc">Name Z → A</option>
                  <option value="recent-desc">Recently added</option>
                  <option value="recent-asc">Oldest first</option>
                </select>

                <ThemeToggle />

                <Button onClick={() => setIsAddDialogOpen(true)}>
                  Add New Contact
                </Button>
              </div>
            </div>

            <ScrollArea className="h-[calc(100vh-200px)]">
              {filteredContacts.length > 0 ? (
                <div className="space-y-2">
                  {filteredContacts.map((contact) => (
                    <ContactCard key={contact.id} contact={contact} />
                  ))}
                </div>
              ) : (
                <EmptyState searchQuery={searchQuery} />
              )}
            </ScrollArea>
          </main>
        </div>
      </div>

      <AddContactDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAdd={handleAddContact}
      />
    </div>
  );
}

export default App;