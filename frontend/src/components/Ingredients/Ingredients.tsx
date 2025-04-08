import { FC, Fragment, useState } from "react";
import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal";

export const Ingredients: FC<{ items: Array<Ingredient> }> = ({ items }) => {
    const [activeContent, setActiveContent] = useState<string>('')
    return <Fragment>
        {items?.map(ingredient => (
            <Button onClick={() => setActiveContent(ingredient?.description)} key={ingredient?.label} variant='text' className="bg-stone-200 px-3 py-1.5">{ingredient?.label}</Button>
        ))}
        <Modal open={!!activeContent} onClose={() => setActiveContent('')}>
            <div className="text-xl">
                {activeContent}
            </div>
        </Modal>
    </Fragment>
}