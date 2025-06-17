export enum Service {
    // Residential
    HouseExteriors = "House Exteriors",
    Driveways = "Driveways",
    DecksPatios = "Decks & Patios",
    FencesGates = "Fences & Gates",
    WindowCleaning = "Window Cleaning",
    GutterCleaning = "Gutter Cleaning",

    // Commercial
    OfficeBuildings = "Office Buildings",
    ParkingLots = "Parking Lots",
    Storefronts = "Storefronts",
    Warehouses = "Warehouses",
    DumpsterPads = "Dumpster Pads",
}

export type FormValues = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    service: Service;
    address: string;
    comments: string;
  };