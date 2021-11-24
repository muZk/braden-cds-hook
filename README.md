# Pressure Ulcer CDS Hook Demo

Este proyecto esta basado en https://github.com/uwbhi/phi533-cdshook.git y es una demo de como invocar CDS-Hooks para un propósito de CDS Determinado.

Puede ser invocado desde la Sandbox [sandbox](http://sandbox.cds-hooks.org/).

## Qué hace

Da sugerencias para la prevenciíon de úlcera por presión (UPP) en base a la valoración de riesgo (usando la escala de [Braden](https://revistamedica.com/como/escala-de-braden/)).

Para esto, revisa la evaluación de Braden de un paciente particular (desde FHIR) y entrega sugerencias de cuidado en base al riesgo de úlcera por presión (UPP).

Notas:

- Las sugerencias están basadas en el protocolo de prevención de úlceras por presión del Hospital Santiago Oriente ([fuente](http://200.72.129.100/transparencia/transparencia_activa/documentos/matroneria/protocolo_prevencion_ulceras_por_presion.pdf)
- Asume que el recurso de FHIR para guardar la evaluación de Braden es [DiagnosticReport](https://www.hl7.org/fhir/diagnosticreport.html), utilizando el formato que aparece en [LHC FHIR Tools](https://lhcforms.nlm.nih.gov/lhcforms) (bajo el nombre de "Braden scale skin assessment panel"), el cual corresponde al panel [38228-3](https://loinc.org/38228-3) en LOINC.

## Prerequisitos

- [NodeJS](https://nodejs.org/en/download/)
- [Yarn](https://yarnpkg.com/)

## Instrucciones y Ejecución

Clonar este repo

```
git clone https://github.com/muZk/braden-cds-hook && cd braden-cds-hook
```

Instalar las dependencias

```
yarn install
```

Correr la aplicacion

```
yarn start
```

## Probar

### Chequeo Básico

Navigar a `http://localhost:5000/` y asegurarse de ver un mensaje de que el servicio funciona

### Configurar el Sandbox

Navegar al [CDS Hooks sandbox](http://sandbox.cds-hooks.org/). Seleccionar **CDS Services** y elegir **ADD CDS Service**.

1. En la pregunta sobre el discovery endpoint, ingresar `http://localhost:5000/cds-services`
2. Ver si se muestra el mensaje con la sugerencia de cuidado para el paciente
3. ¡Listo!
