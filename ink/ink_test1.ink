// powerHour.ink

VAR final_score       = 0
VAR burnout_level     = 0
VAR pledge_success    = 0
VAR pledge_failures   = 0
VAR burnout_count     = 0


-> powerHour_outro

=== powerHour_outro ===
This line always shows up.

{
- final_score < 1:
    Your score is zero as expected.
}

{
- final_score >= 45:
    You achieved exceptional productivity. Final score: {final_score}.
- final_score >= 30:
    You met your quotas. Final score: {final_score}.
- else:
    Minimal throughput detected. Final score: {final_score}.
}

// …and so on for burnout, pledges, etc.

-> DONE
