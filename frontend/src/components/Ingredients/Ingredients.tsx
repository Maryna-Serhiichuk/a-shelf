import { FC, Fragment, useState } from "react";
import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal";

export const Ingredients: FC<{ items: Array<Ingredient> }> = ({ items }) => {
    const [activeContent, setActiveContent] = useState<string>('')
    return <Fragment>
        {items?.map(ingredient => (
            <Button onClick={() => setActiveContent(ingredient?.description)} key={ingredient?.label} variant='text' className="bg-stone-200 dark:bg-stone-700 px-3 py-1.5 shadow-[0px_0px_10px_rgba(0,0,0,.05)]">
                <div className="dark:text-stone-300 font-medium">
                    {ingredient?.label}
                </div>
            </Button>
        ))}
        <Modal open={!!activeContent} onClose={() => setActiveContent('')}>
            <div className="text-sm sm:text-xl">
                {activeContent}
            </div>
        </Modal>
    </Fragment>
}