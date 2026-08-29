const PagoPaypal = () => (
  <aside className="flex items-center gap-3 sm:gap-4">
    <span className="pago-escena" aria-hidden="true">
      <span className="pago-globo" />
      <span className="pago-avion" />
    </span>

    <p className="text-[15px] font-semibold leading-snug text-tinta sm:text-[16px]">
      ¿Estás fuera de Chile?
      <br />
      Puedes pagar con{' '}
      <span className="font-extrabold italic whitespace-nowrap">
        <span className="text-[#003087]">Pay</span>
        <span className="text-[#0070ba]">Pal</span>
      </span>
    </p>
  </aside>
);

export default PagoPaypal;
