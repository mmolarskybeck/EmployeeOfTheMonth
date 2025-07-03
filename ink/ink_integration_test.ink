VAR final_score = 0
VAR burnout_level = 0
VAR pledge_success = 0
VAR pledge_failures = 0
VAR burnout_count = 0

=== powerHour_outro ===

~ if (final_score >= 45)
You achieved exceptional productivity. Final score: {final_score}.
~ else
~     if (final_score >= 30)
You met your quotas. Final score: {final_score}.
~     else
Minimal throughput detected. Final score: {final_score}.

~ if (burnout_level >= 8)
You’re showing signs of extreme fatigue. Please hydrate.
~ else
~     if (burnout_level <= 2)
Remarkably low stress detected. Well done.

~ if (pledge_success > 0 and pledge_failures == 0)
All visibility pledges were fulfilled.
~ else
~     if (pledge_failures > 0)
Some pledges expired without completion.

~ if (burnout_count > 1)
You visited the wellness pod more than once. HR has been notified.

-> END
