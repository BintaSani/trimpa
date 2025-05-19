

  export type StopInfo = {
    duration: string;
    location: string;
  };
  
  export type AdditionalService = {
    type: string;
    price: string;
  };
  
  export type TransformedFlightOffer = {
    duration: string;
    durationTwo?: string;
    airline: string;
    airlineTwo?: string;
    departureTime: string;
    arrivalTime: string;
    departureTimeTwo?: string;
    arrivalTimeTwo?: string;
    numberOfStops: number;
    numberOfStopsTwo?: number;
    stops: StopInfo[];
    stopsTwo?: StopInfo[];
    totalCost: string;
    currency: string;
    isOneWay: boolean;
    additionalServices: AdditionalService[];
    airlineLogo: string;
  };

  function formatTime(iso: string): string {
    const date = new Date(iso);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }
  
  function formatDuration(isoDuration: string): string {
     if (!isoDuration) return '';
    return isoDuration
      .replace('PT', '')
      .replace('H', 'h ')
      .replace('M', 'm')
      .trim();
  }
  
  function getDurationBetween(start: string, end: string): string {
    const diffMs = new Date(end).getTime() - new Date(start).getTime();
    const minutes = Math.floor(diffMs / 60000);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  }
  

  export function transformFlightOffers(data: any): TransformedFlightOffer[] {
    const carriersDict = data.dictionaries?.carriers || {};
    return data.data.map((offer: any): TransformedFlightOffer => {
      const itinerary = offer.itineraries[0];
      const itineraryTwo = offer.itineraries[1];
      const segmentsTwo = itineraryTwo?.segments;
      const segments = itinerary.segments;
      const isOneWay = offer.oneWay;
      const firstSegment = segments[0];
      const secondSegment = segmentsTwo?.[0];
      const lastSegment = segments[segments.length - 1];
  
      const stops: StopInfo[] = segments.slice(0, -1).map((segment: any, index: number) => {
        const nextSegment = segments[index + 1];
        return {
          location: segment.arrival.iataCode,
          duration: getDurationBetween(segment.arrival.at, nextSegment.departure.at)
        };
      });
      const stopsTwo: StopInfo[] = segmentsTwo?.slice(0, -1).map((segment: any, index: number) => {
        const nextSegment = segmentsTwo?.[index + 1];
        return {
          location: segment.arrival.iataCode,
          duration: getDurationBetween(segment.arrival.at, nextSegment.departure.at)
        };
      });
  
      const airlineCode: string = firstSegment.carrierCode;
      const airlineCodeTwo: string = secondSegment?.carrierCode;
      const airlineNameTwo:string = carriersDict?.[airlineCodeTwo] || airlineCodeTwo;
      const airlineName:string = carriersDict[airlineCode] || airlineCode;
  
      const additionalServices: AdditionalService[] = offer.travelerPricings.flatMap((tp: any) =>
        tp.fareDetailsBySegment.flatMap((fd: any) => {
          if (fd.includedCheckedBags?.weight) {
            return [{
              type: "CHECKED_BAGS",
              price: fd.includedCheckedBags.weight.toString()
            }];
          }
          return [];
        })
      );
  
      return {
        duration: formatDuration(itinerary.duration),
        durationTwo: formatDuration(itineraryTwo?.duration),
        airline: airlineName,
        airlineTwo: airlineNameTwo ? airlineNameTwo : '',
        departureTime: formatTime(firstSegment.departure.at),
        arrivalTime: formatTime(lastSegment.arrival.at),
        departureTimeTwo: formatTime(secondSegment?.departure.at),
        arrivalTimeTwo: formatTime(segmentsTwo?.[segmentsTwo?.length - 1].arrival.at),
        numberOfStops: segments.length - 1,
        numberOfStopsTwo: segmentsTwo?.length - 1,
        stops,
        stopsTwo,
        totalCost: offer.price.total,
        currency: offer.price.currency,
        isOneWay: isOneWay,
        additionalServices,
        airlineLogo: `https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/${airlineCode || airlineCodeTwo}.svg`
      };
    });
  }
  