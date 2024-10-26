"use client"
import {
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
    AlertDialogAction,
  } from "../ui/alert-dialog";
  
  const DeleteModal = ({
    children,
    name,
    handelDelete ,
  }: {
    children: React.ReactNode;
    name: string;
    handelDelete?: () => void;
  }) => {
    return (
      <AlertDialog>
        <AlertDialogTrigger>{children}</AlertDialogTrigger>
        <AlertDialogContent className="bg-white flex flex-col gap-y-2">
          <AlertDialogHeader className="flex flex-col gap-y-1">
            <AlertDialogTitle className="text-center">
              Do you confirm deleting{" "}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center font-bold text-xl">
              {name}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="self-center ">
            <AlertDialogCancel className="rounded-md px-4 py-2 max-md:py-1 text-second  font-medium bg-main text-xl max-md:text-base whitespace-nowrap cursor-pointer hover:brightness-[92%]">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handelDelete}  className="rounded-md px-4 py-2 max-md:py-1 text-main font-medium bg-second text-lg max-md:text-base whitespace-nowrap cursor-pointer hover:brightness-[92%]">
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };
  
  export default DeleteModal;
  