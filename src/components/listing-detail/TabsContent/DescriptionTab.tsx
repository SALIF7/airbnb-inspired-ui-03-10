
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { MagicBook } from "@/components/ui/magic-book";
import { toast } from "sonner";

export interface DescriptionTabProps {
  description: string | undefined;
  bookTitle?: string;
}

const DescriptionTab = ({ description, bookTitle = "Coup de cœur voyageurs" }: DescriptionTabProps) => (
  <TabsContent value="description" className="animate-fade-in pt-6">
    <div className="prose prose-lg max-w-none relative">
      <div className="float-right ml-6 mb-6 hidden md:block">
        <MagicBook 
          title={bookTitle}
          onClick={() => toast.success("Recommandé par l'hôte!", {
            description: "Ce lieu est particulièrement apprécié des voyageurs."
          })}
        />
      </div>
      
      <div className="text-gray-700 whitespace-pre-line text-base md:text-lg leading-relaxed">
        {description ? (
          <>
            {description.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </>
        ) : (
          <p>Aucune description disponible pour ce logement.</p>
        )}
      </div>
      
      {/* Version mobile du livre magique */}
      <div className="flex justify-center my-6 md:hidden">
        <MagicBook 
          title={bookTitle}
          onClick={() => toast.success("Recommandé par l'hôte!", {
            description: "Ce lieu est particulièrement apprécié des voyageurs."
          })}
        />
      </div>
    </div>
  </TabsContent>
);

export default DescriptionTab;
