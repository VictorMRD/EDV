"use client"

import Form from 'next/form'
import { useForm, SubmitHandler } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type Inputs = {
    title: string
    subtitle: string
    description: string
    imageFiles: FileList
    files: FileList
}

export default function page() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)
    
    return (
        <div>
            <p>Crear publicacion</p>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-fit items-start border-2 p-2 gap-4">
                <div className="grid w-full max-w-sm items-center gap-2">
                    <Label htmlFor="title_input">Título de la publicación</Label>
                    <Input id="title" {...register("title", {required: true })} type="text" className="h-8" />
                    {errors.title && <span className="text-red-500 italic text-sm">El titulo de la publicación es requerido</span>}
                </div>
                <div className="grid w-full max-w-sm items-center gap-2">
                    <Label htmlFor="subtitle_input">Subtítulo de la publicación</Label>
                    <Input id="subtitle" {...register("subtitle", {required: true })} type="text" className="h-8" />
                    {errors.subtitle && <span className="text-red-500 italic text-sm">El subtítulo de la publicación es requerido</span>}
                </div>
                <div className="grid w-full max-w-sm items-center gap-2">
                    <Label htmlFor="title_input">Descripción de la publicación</Label>
                    <Textarea id="description" {...register("description", { required: true })} type="text" placeholder="Type your message here." className="resize-none h-100" />
                    <p className="text-muted-foreground text-sm">
                        Escriba aquí el cuerpo principal de la publicación
                    </p>
                    {errors.description && <span className="text-red-500 italic text-sm">La descripcion es requerida</span>}
                </div>
                <div className="grid w-full max-w-sm items-center gap-2">
                    <Label htmlFor="title_input">Imagenes de la publicación</Label>
                    <Input
                        type="file"
                        multiple
                        accept="image/*"
                        {...register("imageFiles", {
                            validate: {
                            onlyImages: (files: FileList) =>
                                Array.from(files).every(file =>
                                file.type.startsWith("image/")
                                ) || "Todos los archivos deben ser imágenes (jpg, png, etc.)",
                            },
                        })}
                    />
                    {errors.imageFiles && <span className="text-red-500 italic text-sm">Ha ocurrido un error con su archivo</span>}
                </div>
                <div className="grid w-full max-w-sm items-center gap-2">
                    <Label htmlFor="title_input">Archivos PDF</Label>
                    <Input 
                        id="title" 
                        type="file" 
                        className="h-8" 
                        multiple
                        accept="application/pdf"
                        {...register("files", {
                            validate: {
                                onlyPDFs: (files: FileList) =>
                                    Array.from(files).every(file => file.type === "application/pdf") ||
                                    "Solo puede subir archivos PDF",
                            },
                        })} 
                        />
                    {errors.files && <span className="text-red-500 italic text-sm">Ha ocurrido un error con sus archivos</span>}
                </div>
                <button type="submit" className="dark:bg-white dark:text-black border-1 rounded-xs dark:border-0 px-4">Enviar</button>
            </form>
        </div>
    );
}