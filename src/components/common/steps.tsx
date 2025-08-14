import { Check } from 'lucide-react'

export function Steps({
  identification,
  payment,
}: {
  identification?: boolean
  payment?: boolean
}) {
  return (
    <div className="flex justify-center gap-2.5">
      <div className="flex items-center gap-2">
        <div
          className={`flex h-6 w-6 items-center justify-center rounded-full bg-[#0EAD00]`}
        >
          <Check size={10} color="white" strokeWidth={6} />
        </div>
        <p className="text-xs font-medium text-[#656565]">Sacola</p>
        <div className="h-1 w-1 rounded-full bg-[#0EAD00]"></div>
      </div>
      <div className="flex items-center gap-2">
        <div
          className={`flex h-6 w-6 items-center justify-center rounded-full ${identification ? 'bg-[#0EAD00]' : 'border border-[#0EAD00] bg-white text-[#0EAD00]'}`}
        >
          {identification ? (
            <Check size={10} color="white" strokeWidth={6} />
          ) : (
            <p className="text-xs font-semibold text-[#0EAD00]">2</p>
          )}
        </div>
        <p className="text-xs font-medium text-[#656565]">Identificação</p>
        <div className="h-1 w-1 rounded-full bg-[#0EAD00]"></div>
      </div>
      <div className="flex items-center gap-2">
        <div
          className={`flex h-6 w-6 items-center justify-center rounded-full ${payment ? 'bg-[#0EAD00]' : 'border border-[#0EAD00] bg-white text-[#0EAD00]'}`}
        >
          {payment ? (
            <Check size={10} color="white" strokeWidth={6} />
          ) : (
            <p className="text-xs font-semibold text-[#0EAD00]">3</p>
          )}
        </div>
        <p className="text-xs font-medium text-[#656565]">Pagamento</p>
      </div>
    </div>
  )
}
