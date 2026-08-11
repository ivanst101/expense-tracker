import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { CircleCheck } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

interface DialogWindowProps {
  button: React.ReactElement;
}

export default function DialogWindow({ button }: DialogWindowProps) {
  const categories = [
    { label: "Bills", value: "bill" },
    { label: "Fuel", value: "fuel" },
    { label: "GYM", value: "gym" },
  ];
  return (
    <Dialog>
      <DialogTrigger render={button}></DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
          <DialogDescription>
            Log a new expense to your wealth dashboard
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <FieldGroup className="grid w-full grid-cols-2">
          <Field>
            <FieldLabel htmlFor="amount">Amount</FieldLabel>
            <Input
              id="amount"
              name="amount"
              type="number"
              placeholder="0.00"
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="category">Category</FieldLabel>
            <Select items={categories} defaultValue="Bills">
              <SelectTrigger id="form-category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <FieldLabel htmlFor="date">Date</FieldLabel>
            <Input id="date" type="date" name="date" required />
          </Field>
          <div className="col-span-2">
            <Field>
              <FieldLabel htmlFor="textarea-message">Note</FieldLabel>
              <Textarea
                id="textarea-message"
                placeholder="Type your note here"
              />
            </Field>
          </div>
        </FieldGroup>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button type="submit">
            <CircleCheck />
            Save transaction
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
