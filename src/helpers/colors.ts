export function getColor(condition: string, value: number): string {
  switch (condition) {
    case "airQuality":
      if (value < 50) {
        return "primary";
      } else if (value < 100) {
        return "success";
      } else if (value < 150) {
        return "warning";
      } else if (value < 200) {
        return "secondary";
      } else if (value < 300) {
        return "danger";
      } else {
        return "default";
      }
    case "temperature":
      if (value < 0) {
        return "primary";
      } else if (value < 10) {
        return "success";
      } else if (value < 20) {
        return "warning";
      } else if (value < 30) {
        return "secondary";
      } else if (value < 40) {
        return "danger";
      } else {
        return "default";
      }
    case "humidity":
      if (value < 20) {
        return "primary";
      } else if (value < 40) {
        return "success";
      } else if (value < 60) {
        return "warning";
      } else if (value < 80) {
        return "secondary";
      } else {
        return "danger";
      }
    case "co2":
      if (value < 400) {
        return "success"; // or any color you prefer for excellent levels
      } else if (value < 800) {
        return "primary"; // or any color for good levels
      } else if (value < 1000) {
        return "secondary"; // or any color for moderate levels
      } else if (value < 1500) {
        return "warning"; // or any color for unhealthy for sensitive groups
      } else if (value < 2000) {
        return "danger"; // or any color for unhealthy levels
      } else {
        return "danger"; // or any color for very unhealthy levels
      }
    default:
      return "default";
  }
}
