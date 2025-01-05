import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { addStudent } from "@/services/api";
import { PlusCircle } from "lucide-react";

interface AddStudentDialogProps {
  onStudentAdded: () => void;
}

export function AddStudentDialog({ onStudentAdded }: AddStudentDialogProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const studentData = {
      nom: formData.get('nom') as string,
      prenom: formData.get('prenom') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      avatar: "Default avatar",
      matricule: `MATR-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      ecole: {
        _id: "670e66283996da36c7cfe378",
        libelle: "Eces",
        ville: "Brazzaville",
        telephone: "068676562"
      },
      date: new Date().toISOString()
    };

    try {
      await addStudent(studentData);
      toast({
        title: "Succès",
        description: "L'apprenant a été ajouté avec succès",
      });
      onStudentAdded();
      setOpen(false);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter l'apprenant",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Ajouter un apprenant
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter un nouvel apprenant</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nom" className="text-right">
                Nom
              </Label>
              <Input
                id="nom"
                name="nom"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="prenom" className="text-right">
                Prénom
              </Label>
              <Input
                id="prenom"
                name="prenom"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Téléphone
              </Label>
              <Input
                id="phone"
                name="phone"
                className="col-span-3"
                required
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Ajout en cours..." : "Ajouter"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}