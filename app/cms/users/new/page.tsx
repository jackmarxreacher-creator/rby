import { createUser } from "../actions";
import { UserForm } from "../_components/UserForm";

export default async function NewUserPage() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <UserForm onSave={createUser} />
    </div>
  );
}