import { getDurationBetween, formatTime, formatDuration } from "@/lib/utils";
import {
  TransformedFlightOffer,
  StopInfo,
  AdditionalService,
} from "@/types/selectedFlisghtData";
export function transformFlightOffers(data: any): TransformedFlightOffer[] {
  const carriersDict = data.dictionaries?.carriers || {};

  // console.log(data);
  return data.data.map((offer: any): TransformedFlightOffer => {
    const numberOfSeatsAvailable = offer.numberOfBookableSeats;
    const itinerary = offer.itineraries[0];
    const itineraryTwo = offer.itineraries[1];
    const segmentsTwo = itineraryTwo?.segments;
    const segments = itinerary.segments;
    const isOneWay = offer.oneWay;
    const firstSegment = segments[0];
    const secondSegment = segmentsTwo?.[0];
    const lastSegment = segments[segments.length - 1];

    const stops: StopInfo[] = segments
      .slice(0, -1)
      .map((segment: any, index: number) => {
        const nextSegment = segments[index + 1];
        return {
          location: segment.arrival.iataCode,
          duration: getDurationBetween(
            segment.arrival.at,
            nextSegment.departure.at
          ),
        };
      });
    const stopsTwo: StopInfo[] = segmentsTwo
      ?.slice(0, -1)
      .map((segment: any, index: number) => {
        const nextSegment = segmentsTwo?.[index + 1];
        return {
          location: segment.arrival.iataCode,
          duration: getDurationBetween(
            segment.arrival.at,
            nextSegment.departure.at
          ),
        };
      });

    const airlineCode: string = firstSegment.carrierCode;
    const airlineCodeTwo: string = secondSegment?.carrierCode;
    const airlineNameTwo: string =
      carriersDict?.[airlineCodeTwo] || airlineCodeTwo;
    const airlineName: string = carriersDict[airlineCode] || airlineCode;

    const additionalServices: AdditionalService[] =
      offer.travelerPricings.flatMap((tp: any) =>
        tp.fareDetailsBySegment.flatMap((fd: any) => {
          if (fd.includedCheckedBags?.weight) {
            return [
              {
                type: "CHECKED_BAGS",
                price: fd.includedCheckedBags.weight.toString(),
              },
            ];
          }
          return [];
        })
      );

    return {
      id: firstSegment.number,
      returnId: secondSegment?.number,
      numberOfSeatsAvailable: numberOfSeatsAvailable,
      duration: formatDuration(itinerary.duration),
      durationTwo: formatDuration(itineraryTwo?.duration),
      airline: airlineName,
      airlineTwo: airlineNameTwo ? airlineNameTwo : "",
      airlineCode: airlineCode,
      airlineCodeTwo: airlineCodeTwo ? airlineCodeTwo : "",
      returnAirlineCode: airlineCodeTwo ? airlineCodeTwo : "",
      departureTime: formatTime(firstSegment.departure.at),
      departureDate: firstSegment.departure.at,
      returnDepartureDate: secondSegment?.departure.at,
      returnArrivalDate: secondSegment?.arrival.at,
      arrivalTime: formatTime(lastSegment.arrival.at),
      arrivalDate: lastSegment.arrival.at,
      departureTimeTwo: formatTime(secondSegment?.departure.at),
      arrivalTimeTwo: formatTime(
        segmentsTwo?.[segmentsTwo?.length - 1].arrival.at
      ),
      departureTerminal: firstSegment.departure.terminal,
      arrivalTerminal: firstSegment.arrival.terminal,
      returnDepartureTerminal: secondSegment?.departure.terminal,
      returnArrivalTerminal: secondSegment?.arrival.terminal,
      flightNumber: firstSegment.number,
      returnFlightNumber: secondSegment?.number,
      numberOfStops: segments.length - 1,
      numberOfStopsTwo: segmentsTwo?.length - 1,
      stops,
      stopsTwo,
      departure: firstSegment.departure.iataCode,
      arrival: lastSegment.arrival.iataCode,
      departureTwo: secondSegment?.departure.iataCode,
      arrivalTwo: secondSegment?.arrival.iataCode,
      price: offer.price,
      isOneWay: isOneWay,
      additionalServices,
      airlineLogo: `https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/${
        airlineCode || airlineCodeTwo
      }.svg`,
    };
  });
}
