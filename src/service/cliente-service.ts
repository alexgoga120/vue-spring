// import { ServiceFactory } from './factory/service-factory.js';
//
// export class ClienteService extends ServiceFactory {
//   static #instance;
//   static #factory;
//
//   static getInstance () {
//     if (!this.#instance) {
//       this.#instance = new ClienteService();
//       this.#factory = this.#instance.#buildFactory();
//     }
//
//     return this.#factory;
//   }
//
//   #endpoints = () => ({
//     getClerics: {
//       method: 'GET',
//       uri: '/clientes',
//       naming: 'clerics'
//     },
//   });
//
//   #buildFactory = () => super.buildFactory()(this.#endpoints());
// }
