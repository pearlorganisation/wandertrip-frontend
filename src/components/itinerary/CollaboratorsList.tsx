
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';
import { X, Plus, Mail, Check, AlertCircle, UserPlus } from 'lucide-react';

// Mock data
const mockCollaborators = [
  {
    id: 1,
    name: 'David Chen',
    email: 'david@example.com',
    avatar: 'https://i.pravatar.cc/150?img=3',
    role: 'editor',
    status: 'active'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    avatar: 'https://i.pravatar.cc/150?img=5',
    role: 'viewer',
    status: 'active'
  },
  {
    id: 3,
    email: 'mike@example.com',
    name: '',
    avatar: '',
    role: 'editor',
    status: 'pending'
  }
];

interface CollaboratorsListProps {
  itineraryId: string;
}

export const CollaboratorsList = ({ itineraryId }: CollaboratorsListProps) => {
  const [collaborators, setCollaborators] = useState(mockCollaborators);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('editor');
  
  const handleRemoveCollaborator = (id: number) => {
    setCollaborators(collaborators.filter(c => c.id !== id));
    toast.success('Collaborator removed successfully');
  };
  
  const handleInvite = () => {
    if (!inviteEmail || !inviteEmail.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    // Check if email already exists
    if (collaborators.some(c => c.email === inviteEmail)) {
      toast.error('This person is already a collaborator');
      return;
    }
    
    // Add new collaborator
    const newCollaborator = {
      id: Date.now(), // temporary ID
      email: inviteEmail,
      name: '',
      avatar: '',
      role: inviteRole,
      status: 'pending'
    };
    
    setCollaborators([...collaborators, newCollaborator]);
    setIsAddDialogOpen(false);
    setInviteEmail('');
    
    toast.success('Invitation sent successfully');
  };
  
  const handleRoleChange = (id: number, role: string) => {
    setCollaborators(collaborators.map(c => 
      c.id === id ? { ...c, role } : c
    ));
    toast.success('Collaborator role updated');
  };
  
  const resendInvitation = (email: string) => {
    toast.success(`Invitation resent to ${email}`);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Trip Collaborators</h3>
        <Button 
          size="sm" 
          onClick={() => setIsAddDialogOpen(true)}
          className="flex items-center"
        >
          <UserPlus size={16} className="mr-1.5" />
          Add People
        </Button>
      </div>
      
      <div className="space-y-3">
        {collaborators.map((collaborator) => (
          <div 
            key={collaborator.id}
            className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/30"
          >
            <div className="flex items-center space-x-3">
              <Avatar>
                {collaborator.avatar ? (
                  <AvatarImage src={collaborator.avatar} alt={collaborator.name || collaborator.email} />
                ) : (
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {collaborator.email.charAt(0).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
              
              <div>
                {collaborator.name ? (
                  <>
                    <p className="font-medium">{collaborator.name}</p>
                    <p className="text-xs text-muted-foreground">{collaborator.email}</p>
                  </>
                ) : (
                  <div className="space-y-1">
                    <p className="font-medium">{collaborator.email}</p>
                    {collaborator.status === 'pending' && (
                      <div className="flex items-center text-xs">
                        <span className="flex items-center text-amber-500">
                          <AlertCircle size={12} className="mr-1" />
                          Pending
                        </span>
                        <button 
                          className="ml-2 text-primary hover:underline text-xs"
                          onClick={() => resendInvitation(collaborator.email)}
                        >
                          Resend invitation
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Select 
                defaultValue={collaborator.role}
                onValueChange={(value) => handleRoleChange(collaborator.id, value)}
              >
                <SelectTrigger className="w-28 h-8 text-xs bg-muted/50">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
              
              <button
                onClick={() => handleRemoveCollaborator(collaborator.id)}
                className="p-1 text-muted-foreground hover:text-destructive transition-colors rounded-md"
                aria-label="Remove collaborator"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Invite Collaborators</DialogTitle>
            <DialogDescription>
              Add people to collaborate on this trip itinerary
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email address</Label>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="colleague@example.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="flex-grow"
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="role">Permission</Label>
              <Select defaultValue="editor" onValueChange={setInviteRole}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="editor">
                    <div className="flex items-center">
                      <Check size={16} className="mr-2 text-primary" />
                      <div>
                        <p>Editor</p>
                        <p className="text-xs text-muted-foreground">Can edit and make changes to the itinerary</p>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="viewer">
                    <div className="flex items-center">
                      <Check size={16} className="mr-2 text-primary" />
                      <div>
                        <p>Viewer</p>
                        <p className="text-xs text-muted-foreground">Can only view the itinerary without making changes</p>
                      </div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsAddDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleInvite}>Send Invitation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
