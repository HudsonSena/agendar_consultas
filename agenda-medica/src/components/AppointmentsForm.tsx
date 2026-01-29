'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

// 1. Esquema de validação
const formSchema = z.object({
  name: z.string().min(3, "Nome muito curto"),
  age: z.coerce.number().min(0, "Idade inválida").max(120),
  phone: z.string().min(10, "Telefone inválido"),
  cpf: z.string().length(11, "CPF deve ter 11 dígitos"),
  address: z.string().min(5, "Endereço incompleto"),
  email: z.string().email("E-mail inválido"),
  date: z.string().min(1, "Data é obrigatória"),
})

// 2. Extraímos o tipo exato que o Zod valida
type FormData = z.infer<typeof formSchema>

export default function AppointmentForm() {
  // 3. Passamos o FormData para o useForm. O TS agora sabe exatamente o que esperar.
  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors, isSubmitting } 
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    // Opcional: define valores iniciais para evitar campos undefined
    defaultValues: {
      name: '',
      age: 0,
      phone: '',
      cpf: '',
      address: '',
      email: '',
      date: ''
    }
  })

  // 4. Usamos o tipo SubmitHandler para tipar a função onSubmit corretamente
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        alert("Consulta agendada com sucesso!")
        reset()
      } else {
        const errorData = await response.json()
        alert(errorData.error || "Erro ao salvar agendamento.")
      }
    } catch (error) {
      alert("Erro de conexão com a API.")
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Novo Agendamento</h2>
      
      {/* O handleSubmit agora reconhece o onSubmit perfeitamente */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nome</label>
          <input 
            {...register("name")} 
            className={`w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`} 
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Idade</label>
            <input 
              type="number" 
              {...register("age")} 
              className="w-full border border-gray-300 p-2 rounded" 
            />
            {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">CPF (11 dígitos)</label>
            <input 
              {...register("cpf")} 
              className="w-full border border-gray-300 p-2 rounded" 
            />
            {errors.cpf && <p className="text-red-500 text-xs mt-1">{errors.cpf.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Telefone</label>
            <input {...register("phone")} className="w-full border border-gray-300 p-2 rounded" />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">E-mail</label>
            <input type="email" {...register("email")} className="w-full border border-gray-300 p-2 rounded" />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Endereço</label>
          <input {...register("address")} className="w-full border border-gray-300 p-2 rounded" />
          {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Data da Consulta</label>
          <input type="datetime-local" {...register("date")} className="w-full border border-gray-300 p-2 rounded" />
          {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 disabled:bg-gray-400 transition"
        >
          {isSubmitting ? "Processando..." : "Finalizar Agendamento"}
        </button>
      </form>
    </div>
  )
}