import invitations from '../data/invitations.json';
import InvitationSection from './InvitationSection.jsx';
import { PRECIOS } from '../data/pricing.js';
import PagoPaypal from './PagoPaypal.jsx';

const TARIFAS = [PRECIOS.completa, PRECIOS.simple];

const InvitationsList = () => (
  <div>
    <div className="mb-6 flex flex-col gap-2">
      <h2 className="titular text-4xl md:text-5xl lg:text-[54px]">
        Elige tu invitación
      </h2>
      <p className="text-[17px] text-tinta-2">
        Dale play a una invitación para verla en movimiento.
      </p>
    </div>

    <div className="mb-8 flex flex-col gap-6 sm:mb-10 md:flex-row md:items-center md:justify-between md:gap-10">
      <ul className="flex flex-col gap-1.5">
        {TARIFAS.map((tarifa) => (
          <li
            key={tarifa.precio}
            className="text-[15px] leading-snug text-tinta-2 sm:text-[16px]"
          >
            <span className="font-bold text-tinta">{tarifa.precio}</span>{' '}
            {tarifa.resumen}
          </li>
        ))}
      </ul>

      <PagoPaypal />
    </div>

    <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
      {invitations.map((inv) => (
        <InvitationSection key={inv.id} data={inv} />
      ))}
    </div>
  </div>
);

export default InvitationsList;
