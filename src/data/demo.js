// Fictional sample data for the interactive product showcase.
// None of these people, jobs or figures are real.

export const reels = [
  {
    id: 'FR-2041', kind: 'fridge', item: 'Two-door refrigerator', length: '0:14',
    narration: '“It’s been humming all night but the top section is warm. There’s a clicking every few minutes.”',
    detected: ['Refrigerator', 'Frost on rear panel', 'Display: 12°C'],
    brief: {
      cause: 'Start relay or compressor failing to start (clicking with no cooling).',
      alternatives: ['Blocked condenser fan', 'Low refrigerant'],
      urgency: 'High', confidence: 0.78,
      safety: 'Move perishable food. Unplug if the clicking becomes a burning smell.',
      trade: 'Refrigeration', skills: ['Compressors', 'Start relays'],
    },
  },
  {
    id: 'FR-2040', kind: 'pipe', item: 'Kitchen sink waste pipe', length: '0:11',
    narration: '“Water drips from the joint under the sink whenever we run the tap.”',
    detected: ['Sink trap', 'Water droplets', 'PVC compression joint'],
    brief: {
      cause: 'Loose or perished seal on the trap compression joint.',
      alternatives: ['Cracked trap body'],
      urgency: 'Medium', confidence: 0.86,
      safety: 'Place a bowl under the joint and avoid using the sink until fixed.',
      trade: 'Plumbing', skills: ['Traps and waste', 'Compression fittings'],
    },
  },
  {
    id: 'FR-2039', kind: 'socket', item: 'Double wall socket', length: '0:09',
    narration: '“It sparked when I plugged the kettle in and there’s a burnt mark.”',
    detected: ['Wall socket', 'Scorch mark', 'Kettle plug'],
    brief: {
      cause: 'Loose terminal or failed socket outlet causing arcing.',
      alternatives: ['Damaged appliance plug'],
      urgency: 'Urgent', confidence: 0.81,
      safety: 'Do not use this socket. Switch off the circuit at the consumer unit if safe to do so.',
      trade: 'Electrical', skills: ['Sockets', 'Circuit faults'],
    },
  },
  {
    id: 'FR-2038', kind: 'ac', item: 'Wall-mounted split AC', length: '0:15',
    narration: '“Water is dripping from the indoor unit onto the wall since this morning.”',
    detected: ['Split AC indoor unit', 'Water stain', 'Drip line'],
    brief: {
      cause: 'Blocked condensate drain line.',
      alternatives: ['Unit not level', 'Frozen evaporator coil'],
      urgency: 'Medium', confidence: 0.83,
      safety: 'Switch the unit off and keep electrics below it dry.',
      trade: 'HVAC', skills: ['Split units', 'Drain lines'],
    },
  },
]

export const technicians = [
  { id: 't1', name: 'Kofi Mensah', trade: 'Refrigeration', skills: ['Compressors', 'Start relays', 'Gas recharge'], km: 2.1, rating: 4.9, jobs: 212, available: 'Today', quote: '$35–60' },
  { id: 't2', name: 'Amara Okafor', trade: 'Refrigeration', skills: ['Compressors', 'Thermostats'], km: 4.6, rating: 4.7, jobs: 138, available: 'Tomorrow', quote: '$30–55' },
  { id: 't3', name: 'Daniel Reyes', trade: 'Plumbing', skills: ['Traps and waste', 'Compression fittings', 'Leaks'], km: 1.4, rating: 4.8, jobs: 301, available: 'Today', quote: '$20–35' },
  { id: 't4', name: 'Grace Wanjiru', trade: 'Plumbing', skills: ['Leaks', 'Water heaters'], km: 3.9, rating: 4.6, jobs: 97, available: 'Today', quote: '$25–40' },
  { id: 't5', name: 'Samuel Adeyemi', trade: 'Electrical', skills: ['Sockets', 'Circuit faults', 'Rewiring'], km: 2.8, rating: 4.9, jobs: 254, available: 'Today', quote: '$30–50' },
  { id: 't6', name: 'Lena Fischer', trade: 'Electrical', skills: ['Lighting', 'Sockets'], km: 5.2, rating: 4.5, jobs: 76, available: 'Thu', quote: '$28–45' },
  { id: 't7', name: 'Tunde Bakare', trade: 'HVAC', skills: ['Split units', 'Drain lines', 'Gas recharge'], km: 3.3, rating: 4.8, jobs: 189, available: 'Tomorrow', quote: '$25–45' },
  { id: 't8', name: 'Priya Nair', trade: 'HVAC', skills: ['Split units', 'Servicing'], km: 6.0, rating: 4.7, jobs: 121, available: 'Today', quote: '$30–50' },
]

export const jobs = [
  { id: 'J-1187', item: 'Two-door refrigerator', property: 'Flat 4B', tech: 'Kofi Mensah', status: 'Booked', urgency: 'High', quote: '$48', date: 'Nov 9' },
  { id: 'J-1186', item: 'Kitchen sink waste pipe', property: 'House · Elm Rd', tech: 'Daniel Reyes', status: 'Quoting', urgency: 'Medium', quote: '—', date: 'Nov 9' },
  { id: 'J-1185', item: 'Double wall socket', property: 'Flat 2A', tech: 'Samuel Adeyemi', status: 'In progress', urgency: 'Urgent', quote: '$42', date: 'Nov 8' },
  { id: 'J-1184', item: 'Split AC indoor unit', property: 'Shop · Unit 3', tech: 'Tunde Bakare', status: 'Completed', urgency: 'Medium', quote: '$35', date: 'Nov 7' },
  { id: 'J-1183', item: 'Washing machine drum', property: 'Flat 4B', tech: 'Amara Okafor', status: 'Completed', urgency: 'Medium', quote: '$55', date: 'Nov 5' },
  { id: 'J-1182', item: 'Bathroom extractor fan', property: 'Flat 1C', tech: 'Lena Fischer', status: 'Completed', urgency: 'Low', quote: '$30', date: 'Nov 3' },
  { id: 'J-1181', item: 'Water heater pressure valve', property: 'House · Elm Rd', tech: 'Grace Wanjiru', status: 'Completed', urgency: 'High', quote: '$64', date: 'Nov 1' },
]

export const activity = [
  { t: '2 min ago', text: 'Fault brief ready for FR-2041 · refrigerator', tone: 'amber' },
  { t: '9 min ago', text: 'Kofi Mensah sent a quote of $48 for J-1187', tone: 'ink' },
  { t: '25 min ago', text: 'Safety alert: sparking socket in Flat 2A', tone: 'red' },
  { t: '1 hr ago', text: 'Before/after reel ready for J-1184 · split AC', tone: 'green' },
  { t: '3 hr ago', text: 'Tenant in Flat 4B submitted a new Fault Reel', tone: 'ink' },
]
