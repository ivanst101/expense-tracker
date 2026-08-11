import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemMedia,
} from "@/components/ui/item";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import DialogWindow from "../Dialog";

export default function Header() {
  return (
    <header className="w-full">
      <Item className="flex items-center">
        <ItemContent className="flex-1">
          <ItemTitle className="text-4xl sm:text-2xl text-heading-one font-semibold">
            Dashboard
          </ItemTitle>

          <ItemDescription>
            Welcome back, Alex. Here's your financial overview.
          </ItemDescription>
        </ItemContent>

        <ItemActions className="flex items-center gap-4">
          <DialogWindow
            button={
              <Button
                variant="outline"
                className="bg-linear-to-r from-gradient-white-green to-gradient-solid-green text-white cursor-pointer hover:scale-105"
              >
                <Plus /> Quick add
              </Button>
            }
          />
        </ItemActions>

        <ItemMedia>
          <Avatar className="size-11">
            <AvatarImage src="/person.png" />
            <AvatarFallback>AL</AvatarFallback>
          </Avatar>
        </ItemMedia>
      </Item>
    </header>
  );
}
