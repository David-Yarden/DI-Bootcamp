from datetime import date

class Airline:
    def __init__(self, id, name):
        self.id = id
        self.name = name
        self.planes = []

class Airplane:
    def __init__(self, id, current_location, company):
        self.id = id
        self.current_location = current_location
        self.company = company
        self.next_flights = []

    def fly(self, destination):
        for flight in self.next_flights:
            if flight.destination == destination and flight.date == date.today():
                flight.take_off()
                flight.land()
                self.next_flights.remove(flight)
                return True
        return False

    def location_on_date(self, target_date):
        location = self.current_location
        for flight in sorted(self.next_flights, key=lambda f: f.date):
            if flight.date <= target_date:
                location = flight.destination
            else:
                break
        return location

    def available_on_date(self, target_date, location):
        if self.location_on_date(target_date) != location:
            return False
        return all(f.date != target_date for f in self.next_flights)

class Flight:
    def __init__(self, date, destination, origin, plane):
        self.date = date
        self.destination = destination
        self.origin = origin
        self.plane = plane
        self.id = f"{destination.city}-{plane.company.id}-{date}"

    def take_off(self):
        if self.plane in self.origin.planes:
            self.origin.planes.remove(self.plane)

    def land(self):
        self.plane.current_location = self.destination
        self.destination.planes.append(self.plane)

class Airport:
    def __init__(self, city):
        self.city = city
        self.planes = []
        self.scheduled_departures = []
        self.scheduled_arrivals = []

    def schedule_flight(self, destination, flight_date):
        for plane in self.planes:
            if plane.available_on_date(flight_date, self):
                flight = Flight(flight_date, destination, self, plane)
                plane.next_flights.append(flight)
                self.scheduled_departures.append(flight)
                destination.scheduled_arrivals.append(flight)
                self.scheduled_departures.sort(key=lambda f: f.date)
                destination.scheduled_arrivals.sort(key=lambda f: f.date)
                return flight
        return None

    def info(self, start_date, end_date):
        return [
            f for f in (self.scheduled_departures + self.scheduled_arrivals)
            if start_date <= f.date <= end_date
        ]

# --- EXTRA ADDITIONS NOT IN ORIGINAL INSTRUCTIONS ---
# - Added sorting logic in `schedule_flight` so departures and arrivals remain chronological
# - Added automatic removal of a plane from origin airport's list in `take_off`
# - Added automatic updating of plane's location in `land`
# - Added removal of completed flight from plane's `next_flights` in `fly`
# - Generated `id` for Flight based on destination, airline code, and date

# Example test
if __name__ == "__main__":
    airline = Airline("AA", "Alpha Air")
    airport1 = Airport("NYC")
    airport2 = Airport("LAX")

    plane1 = Airplane(1, airport1, airline)
    airline.planes.append(plane1)
    airport1.planes.append(plane1)

    flight = airport1.schedule_flight(airport2, date(2025, 8, 15))
    print(f"Scheduled Flight: {flight.id}")
    print("Flights in NYC:", [f.id for f in airport1.info(date(2025, 8, 1), date(2025, 8, 31))])
    print("Flights in LAX:", [f.id for f in airport2.info(date(2025, 8, 1), date(2025, 8, 31))])

# --- DEMO ---
if __name__ == "__main__":
    airline = Airline("AA", "Alpha Air")
    airport1 = Airport("NYC")
    airport2 = Airport("LAX")

    plane1 = Airplane(1, airport1, airline)
    airline.planes.append(plane1)
    airport1.planes.append(plane1)

    # Schedule a flight for today
    flight = airport1.schedule_flight(airport2, date.today())
    print(f"Scheduled Flight: {flight.id}")
    print("Planes in NYC before flight:", [p.id for p in airport1.planes])
    print("Planes in LAX before flight:", [p.id for p in airport2.planes])

    # Fly
    plane1.fly(airport2)

    # Check after flight
    print("Planes in NYC after flight:", [p.id for p in airport1.planes])
    print("Planes in LAX after flight:", [p.id for p in airport2.planes])