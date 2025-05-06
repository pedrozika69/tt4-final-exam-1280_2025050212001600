using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkoutsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public WorkoutsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Workout>>> GetWorkouts()
        {
            return await _context.Workouts.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Workout>> GetWorkout(int id)
        {
            var workout = await _context.Workouts.FindAsync(id);
            if (workout == null) return NotFound();
            return workout;
        }

        [HttpPost]
        public async Task<ActionResult<Workout>> PostWorkout(Workout workout)
        {
            _context.Workouts.Add(workout);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetWorkout), new { id = workout.Id }, workout);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutWorkout(int id, Workout workout)
        {
            if (id != workout.Id) return BadRequest();

            _context.Entry(workout).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWorkout(int id)
        {
            var workout = await _context.Workouts.FindAsync(id);
            if (workout == null) return NotFound();

            _context.Workouts.Remove(workout);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
