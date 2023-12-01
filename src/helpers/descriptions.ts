// helpers/descriptions.ts

export function getDescription(condition: string, value: number): string {
  switch (condition) {
    case "airQuality":
      if (value < 50) {
        return "Healthy";
      } else if (value < 100) {
        return "Moderate";
      } else if (value < 150) {
        return "Unhealthy for Sensitive Groups";
      } else if (value < 200) {
        return "Unhealthy";
      } else if (value < 300) {
        return "Very Unhealthy";
      } else {
        return "Hazardous";
      }
    case "temperature":
      if (value < 0) {
        return "Very Cold";
      } else if (value < 10) {
        return "Cold";
      } else if (value < 20) {
        return "Cool";
      } else if (value < 30) {
        return "Warm";
      } else if (value < 40) {
        return "Hot";
      } else {
        return "Very Hot";
      }
    case "humidity":
      if (value < 20) {
        return "Very Dry";
      } else if (value < 40) {
        return "Dry";
      } else if (value < 60) {
        return "Comfortable";
      } else if (value < 80) {
        return "Humid";
      } else {
        return "Very Humid";
      }
    case "co2":
      if (value < 400) {
        return "Excellent";
      } else if (value < 800) {
        return "Good";
      } else if (value < 1000) {
        return "Moderate";
      } else if (value < 1500) {
        return "Unhealthy for Sensitive Groups";
      } else if (value < 2000) {
        return "Unhealthy";
      } else {
        return "Very Unhealthy";
      }
    default:
      return "Unknown condition";
  }
}
