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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
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
import { useAddExpense } from "@/hooks/useExpenses";
import { expenseSchema, type ExpenseFormValues } from "@/types/formTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";

interface DialogWindowProps {
  button: React.ReactElement;
}

export default function DialogWindow({ button }: DialogWindowProps) {
  const [open, setOpen] = useState<boolean>(false);
  const categories = [
    { label: "Bills", value: "bill" },
    { label: "Fuel", value: "fuel" },
    { label: "GYM", value: "gym" },
  ];

  const { mutate: addExpense } = useAddExpense();

  const form = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      title: "",
      amount: "",
      category: "",
      date: "",
      note: "",
    },
  });

  const onSubmit: SubmitHandler<ExpenseFormValues> = (values) => {
    addExpense(values, {
      onSuccess: () => {
        toast.success("Expense added successfully!");

        form.reset();
        setOpen(false);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={button}></DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
          <DialogDescription>
            Log a new expense to your wealth dashboard
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="grid w-full grid-cols-2">
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="title">Title</FieldLabel>
                  <Input
                    {...field}
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Type your expense title"
                    required
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="amount"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="amount">Amount</FieldLabel>

                  <Input
                    {...field}
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    step="0.01"
                  />

                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />

            <Controller
              name="category"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="category">Category</FieldLabel>

                  <Select
                    items={categories}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        {categories.map((category) => (
                          <SelectItem
                            key={category.value}
                            value={category.value}
                          >
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />

            <Controller
              name="date"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="date">Date</FieldLabel>

                  <Input {...field} id="date" type="date" />

                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />

            <div className="col-span-2">
              <Controller
                name="note"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor="note">Note</FieldLabel>

                    <Textarea
                      {...field}
                      id="note"
                      placeholder="Type your note here"
                    />
                  </Field>
                )}
              />
            </div>
          </FieldGroup>

          <DialogFooter className="mt-4">
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button type="submit">
              <CircleCheck />
              Save transaction
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
