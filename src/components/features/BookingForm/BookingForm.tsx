'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingSchema, type BookingFormData } from '@/schemas/booking.schema';
import { buildWhatsAppBookingMessage } from '@/utils/whatsapp';
import { formatWhatsApp } from '@/utils/formatters';
import { HOURS } from '@/utils/constants';

interface BookingFormProps {
  services: { title: string }[];
}

export function BookingForm({ services }: BookingFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm<BookingFormData>({ resolver: zodResolver(bookingSchema) });

  const period = watch('period');

  function onSubmit(data: BookingFormData) {
    const dateStr = data.date
      ? new Date(data.date + 'T00:00').toLocaleDateString('pt-BR')
      : data.date;
    window.open(buildWhatsAppBookingMessage({ ...data, date: dateStr }), '_blank');
  }

  const inputClass = (err?: string) =>
    `w-full border ${err ? 'border-[#e599b5]' : 'border-primary/20 dark:border-dark-text/20'} rounded-[12px] px-4 py-[13px] bg-white dark:bg-dark-elevated text-brand-text dark:text-dark-text font-body text-[15px] outline-none focus:border-primary transition-colors`;

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[clamp(28px,4vw,48px)] items-start max-w-[1100px] mx-auto px-6 py-12 pb-20">
      {/* Form card */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-dark-elevated rounded-[24px] p-[clamp(24px,4vw,36px)] border border-primary/10 dark:border-dark-text/10 shadow-card flex flex-col gap-4.5"
        style={{ gap: '18px' }}
      >
        <div className="flex flex-col gap-1.5">
          <label className="text-[14px] font-semibold text-brand-text dark:text-dark-text">Nome completo</label>
          <input {...register('name')} placeholder="Como podemos te chamar?" className={inputClass(errors.name?.message)} />
          {errors.name && <span className="text-[12.5px] text-[#d6336c]">{errors.name.message}</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[14px] font-semibold text-brand-text dark:text-dark-text">WhatsApp</label>
          <Controller
            name="whatsapp"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                placeholder="(11) 99999-9999"
                inputMode="numeric"
                onChange={e => field.onChange(formatWhatsApp(e.target.value))}
                className={inputClass(errors.whatsapp?.message)}
              />
            )}
          />
          {errors.whatsapp && <span className="text-[12.5px] text-[#d6336c]">{errors.whatsapp.message}</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[14px] font-semibold text-brand-text dark:text-dark-text">Serviço desejado</label>
          <select {...register('service')} className={`${inputClass(errors.service?.message)} appearance-none cursor-pointer`}>
            <option value="">Selecione um serviço…</option>
            {services.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
          </select>
          {errors.service && <span className="text-[12.5px] text-[#d6336c]">{errors.service.message}</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[14px] font-semibold text-brand-text dark:text-dark-text">Data desejada</label>
          <input type="date" {...register('date')} className={`${inputClass(errors.date?.message)} cursor-pointer`} />
          {errors.date && <span className="text-[12.5px] text-[#d6336c]">{errors.date.message}</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[14px] font-semibold text-brand-text dark:text-dark-text">Período</label>
          <div className="flex gap-2.5">
            {(['Manhã', 'Tarde', 'Noite'] as const).map(p => (
              <button
                key={p}
                type="button"
                onClick={() => setValue('period', p, { shouldValidate: true })}
                className={`flex-1 py-3 rounded-[12px] border-[1.5px] font-semibold text-[14px] transition-colors ${
                  period === p
                    ? 'bg-primary border-primary text-white'
                    : 'bg-transparent border-primary/20 dark:border-dark-text/20 text-brand-muted dark:text-dark-muted hover:border-primary hover:text-primary'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          {errors.period && <span className="text-[12.5px] text-[#d6336c]">{errors.period.message}</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[14px] font-semibold text-brand-text dark:text-dark-text">Observações (opcional)</label>
          <textarea
            {...register('notes')}
            placeholder="Alguma referência, inspiração ou pedido especial?"
            rows={3}
            className={`${inputClass()} resize-y`}
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:brightness-105 text-white font-semibold rounded-full py-4 px-6 text-[16px] transition-all hover:-translate-y-0.5"
        >
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.7-5A8 8 0 1 1 8 19.3L3 21z" /></svg>
          Enviar pedido pelo WhatsApp
        </button>
        <p className="text-[12.5px] text-brand-muted dark:text-dark-muted text-center">
          Você será redirecionada ao WhatsApp com a mensagem pronta. A confirmação é feita por lá. 💜
        </p>
      </form>

      {/* Side info */}
      <div className="flex flex-col gap-4">
        <div className="rounded-[24px] p-7 text-white bg-primary-dark">
          <div className="font-script text-[30px]">como funciona</div>
          <ol className="mt-3 pl-5 leading-[1.9] text-[15px] opacity-95 list-decimal">
            <li>Preencha o formulário ao lado</li>
            <li>Enviamos sua solicitação pelo WhatsApp</li>
            <li>Confirmamos data e horário com você</li>
            <li>É só vir ser mimada! ✨</li>
          </ol>
        </div>

        <div className="bg-white dark:bg-dark-elevated rounded-[24px] p-7 border border-primary/10 dark:border-dark-text/10 shadow-card">
          <h3 className="font-display text-[20px] text-brand-text dark:text-dark-text font-extrabold mb-4 flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>
            Horário de atendimento
          </h3>
          {HOURS.map(([day, hours]) => (
            <div key={day} className="flex justify-between text-[14.5px] py-2.5 border-t border-primary/10 dark:border-dark-text/10 text-brand-muted dark:text-dark-muted">
              <span>{day}</span>
              <span className="text-brand-text dark:text-dark-text font-semibold">{hours}</span>
            </div>
          ))}
        </div>

        {/* Google Calendar embed placeholder */}
        {/* <iframe src="COLE_AQUI_A_URL_DO_GOOGLE_CALENDAR" style={{ border: 0, width: '100%', height: 320, borderRadius: 16 }} /> */}
      </div>
    </div>
  );
}
