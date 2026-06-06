import { router } from '../router.js';
import { rideService } from '../services/ride.service.js';
import { templateChooseRide, templateRide } from './choose-ride.template.js';
import { RoboComponent, Selector, cloneTemplate } from './robo.component.js';

export class ChooseRideComponent extends RoboComponent {
  /** @type {Ride[]} */
  rides = [];
  connectedCallback() {
    this.appendChild(cloneTemplate(templateChooseRide));
    rideService.getRides().then((rides) => {
      this.rides = rides;
      this.#render();
    });
    this.#render();
  }

  #render() {
    this.by.id.rides.replaceChildren(
      ...this.rides.map((ride) => this.#renderOrderRow(ride)),
    );
  }

  /** @param {Ride} ride */
  #renderOrderRow(ride) {
    const element = cloneTemplate(templateRide);
    const row = new Selector(element);
    row.class.cardTitle.innerText = ride.name;
    row.class.cardText.innerText = ride.description;
    const img = /** @type {HTMLImageElement} */ (row.class.cardImgTop);
    img.src = ride.image;
    const button = /** @type {HTMLButtonElement} */ (
      row.class.cardLink
    );
    button.innerText = `Choose ${ride.name}`;
    button.addEventListener('click', () => {
      router.navigate(['ride', ride.id]);
    });
    return element;
  }
}
customElements.define('robo-choose-ride', ChooseRideComponent);
