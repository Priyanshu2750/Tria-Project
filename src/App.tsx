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
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [tagFilter, setTagFilter] = useState<string | null>(null);

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
    let base = sortedContacts;
    if (tagFilter) {
      base = base.filter(c => (c.tags || []).includes(tagFilter));
    }
    if (!q) return base;
    return base.filter(contact => {
      return (
        contact.name.toLowerCase().includes(q) ||
        contact.email.toLowerCase().includes(q) ||
        contact.phone.toLowerCase().includes(q)
      );
    });
  }, [sortedContacts, searchQuery, tagFilter]);

  const handleAddContact = (newContact: Omit<Contact, 'id'>) => {
    const contact: Contact = {
      ...newContact,
      id: Date.now().toString(),
    };
    setContacts(prev => [...prev, contact]);
    setIsAddDialogOpen(false);
  };

  const allTags = useMemo(() => {
    const s = new Set<string>();
    contacts.forEach(c => (c.tags || []).forEach(t => t && s.add(t)));
    return Array.from(s).sort();
  }, [contacts]);

  const toggleSelect = (id: string, checked: boolean) => {
    setSelectedIds(prev => (checked ? Array.from(new Set([...prev, id])) : prev.filter(x => x !== id)));
  };

  const selectAllVisible = () => {
    setSelectedIds(filteredContacts.map(c => c.id));
  };

  const clearSelection = () => setSelectedIds([]);

  const deleteSelected = () => {
    if (selectedIds.length === 0) return;
    setContacts(prev => prev.filter(c => !selectedIds.includes(c.id)));
    setSelectedIds([]);
  };

  const exportSelected = () => {
    if (selectedIds.length === 0) return;
    const selected = contacts.filter(c => selectedIds.includes(c.id));
    const dataStr = JSON.stringify(selected, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contacts-export-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
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
            {allTags.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground mb-2">Tags</p>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setTagFilter(null)}
                    className={`text-xs px-2 py-1 rounded-md ${tagFilter === null ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
                  >
                    All
                  </button>
                  {allTags.map(t => (
                    <button
                      key={t}
                      onClick={() => setTagFilter(prev => prev === t ? null : t)}
                      className={`text-xs px-2 py-1 rounded-md ${tagFilter === t ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}
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

            {selectedIds.length > 0 ? (
              <div className="flex items-center gap-2">
                <Button onClick={deleteSelected} className="bg-destructive text-destructive-foreground">Delete Selected</Button>
                <Button onClick={exportSelected}>Export Selected</Button>
                <Button onClick={clearSelection}>Clear Selection</Button>
                <Button onClick={selectAllVisible}>Select All Visible</Button>
                <div className="text-sm text-muted-foreground ml-4">{selectedIds.length} selected</div>
              </div>
            ) : null}

            <ScrollArea className="h-[calc(100vh-200px)]">
              {filteredContacts.length > 0 ? (
                <div className="space-y-2">
                  {filteredContacts.map((contact) => (
                    <ContactCard key={contact.id} contact={contact} selected={selectedIds.includes(contact.id)} onSelect={toggleSelect} />
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