using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Workout
    {
        public int Id { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public string Type { get; set; } // This ensures the Type property is always required

        [Required]
        public int Duration { get; set; } // in minutes

        [Required]
        public int CaloriesBurned { get; set; }
    }
}
