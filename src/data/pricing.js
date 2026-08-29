export const PRECIOS = {
    completa: {
        etiqueta: 'Completa',
        valor: 10000,
        precio: '$10.000',
        resumen: 'Tres secciones: inicio, foto o ilustración, y los datos de la fiesta.',
    },
    simple: {
        etiqueta: 'Simple',
        valor: 5000,
        precio: '$5.000',
        resumen: 'Una sola vista con toda la información, sin foto ni ilustración.',
    },
};

export const MONEDA = 'CLP';

export const precioDe = (tipo) => PRECIOS[tipo] ?? null;
